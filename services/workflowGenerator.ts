import { UserProfile } from "../types";

/**
 * Generates an n8n workflow JSON structure.
 * This workflow is designed to:
 * 1. Receive a Webhook trigger (or run manually).
 * 2. Accept Profile Data.
 * 3. Loop through a list of Company Career Pages.
 * 4. Use an HTTP Request / Puppeteer node (conceptual) to submit data.
 */
export const generateN8nWorkflow = (profile: UserProfile) => {
  const workflow = {
    "name": `HireLift Auto-Apply: ${profile.name}`,
    "nodes": [
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "auto-apply-webhook",
          "responseMode": "lastNode",
          "options": {}
        },
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [250, 300]
      },
      {
        "parameters": {
          "values": {
            "string": [
              { "name": "fullName", "value": profile.name },
              { "name": "email", "value": profile.email },
              { "name": "skills", "value": profile.skills.join(", ") },
              { "name": "linkedin", "value": profile.linkedin || "" },
              { "name": "portfolio", "value": profile.portfolio || "" },
              { "name": "resumeText", "value": profile.resumeText.substring(0, 100) + "..." }
            ]
          }
        },
        "name": "User Profile Data",
        "type": "n8n-nodes-base.set",
        "typeVersion": 1,
        "position": [450, 300]
      },
      {
        "parameters": {
          "jsCode": `// List of MNC Career Page Endpoints (Mock)
return [
  { json: { company: "Google", url: "https://careers.google.com/api/apply", method: "POST" } },
  { json: { company: "Amazon", url: "https://amazon.jobs/api/apply", method: "POST" } },
  { json: { company: "Microsoft", url: "https://careers.microsoft.com/api/apply", method: "POST" } },
  { json: { company: "Netflix", url: "https://jobs.netflix.com/api/apply", method: "POST" } },
  { json: { company: "Tesla", url: "https://tesla.com/careers/api/apply", method: "POST" } }
];`
        },
        "name": "Target Companies List",
        "type": "n8n-nodes-base.function",
        "typeVersion": 1,
        "position": [650, 300]
      },
      {
        "parameters": {
          "options": {}
        },
        "name": "Loop Companies",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [850, 300]
      },
      {
        "parameters": {
          "requestMethod": "POST",
          "url": "={{$node[\"Loop Companies\"].json[\"url\"]}}",
          "options": {},
          "bodyParametersUi": {
            "parameter": [
              { "name": "candidate_name", "value": "={{$node[\"User Profile Data\"].parameter[\"values\"][\"string\"][0][\"value\"]}}" },
              { "name": "candidate_email", "value": "={{$node[\"User Profile Data\"].parameter[\"values\"][\"string\"][1][\"value\"]}}" },
              { "name": "resume_data", "value": "={{$node[\"User Profile Data\"].parameter[\"values\"][\"string\"][5][\"value\"]}}" }
            ]
          }
        },
        "name": "HTTP Request (Apply)",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 1,
        "position": [1050, 200]
      },
      {
        "parameters": {
          "fromEmail": "bot@hirelift.ai",
          "toEmail": profile.email,
          "subject": "Application Submitted: {{$node[\"Loop Companies\"].json[\"company\"]}}",
          "text": "Your application to {{$node[\"Loop Companies\"].json[\"company\"]}} was successfully submitted by the HireLift Auto-Bot.",
        },
        "name": "Send Email Confirmation",
        "type": "n8n-nodes-base.emailSend",
        "typeVersion": 1,
        "position": [1250, 200]
      }
    ],
    "connections": {
      "Webhook Trigger": {
        "main": [[{ "node": "User Profile Data", "type": "main", "index": 0 }]]
      },
      "User Profile Data": {
        "main": [[{ "node": "Target Companies List", "type": "main", "index": 0 }]]
      },
      "Target Companies List": {
        "main": [[{ "node": "Loop Companies", "type": "main", "index": 0 }]]
      },
      "Loop Companies": {
        "main": [[{ "node": "HTTP Request (Apply)", "type": "main", "index": 0 }]]
      },
      "HTTP Request (Apply)": {
        "main": [[{ "node": "Send Email Confirmation", "type": "main", "index": 0 }]]
      }
    }
  };

  return JSON.stringify(workflow, null, 2);
};