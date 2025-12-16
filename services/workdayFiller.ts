import { UserProfile } from "../types";

/**
 * Generates a client-side JavaScript snippet that users can run in their browser console
 * to auto-fill Workday job application forms.
 */
export const generateWorkdayConsoleScript = (profile: UserProfile): string => {
  // Use first preferred location as city, or default to San Francisco if empty
  const defaultCity = profile.jobLocation.length > 0 ? profile.jobLocation[0] : 'San Francisco';

  return `
/**
 * 🚀 HIRE-LIFT WORKDAY AUTO-FILLER
 * Instructions:
 * 1. Go to any Workday Job Application page (e.g., "myworkdayjobs.com").
 * 2. Press F12 to open Developer Console.
 * 3. Paste this entire script and hit Enter.
 */

(function() {
  console.log("%c🚀 HireLift Workday Filler Started...", "color: blue; font-size: 16px; font-weight: bold;");

  const candidate = {
    firstName: "${profile.name.split(' ')[0]}",
    lastName: "${profile.name.split(' ').slice(1).join(' ') || ''}",
    email: "${profile.email}",
    phone: "555-0123", // Default placeholder if not in profile
    linkedin: "${profile.linkedin || ''}",
    website: "${profile.portfolio || ''}",
    resumeText: ${JSON.stringify(profile.resumeText)},
    city: "${defaultCity}"
  };

  // Helper to force React/Angular to detect input changes
  const setNativeValue = (element, value) => {
    if (!element) return;
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
    
    if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    } else {
        valueSetter.call(element, value);
    }
    
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('blur', { bubbles: true }));
  };

  // 1. MAPPING STRATEGY: Workday 'data-automation-id' attributes
  // These are standard across most Workday instances
  const workdayMap = {
    'legalNameSection_firstName': candidate.firstName,
    'legalNameSection_lastName': candidate.lastName,
    'contactInformationSection_email': candidate.email,
    'email': candidate.email,
    'jobApplication_linkedIn': candidate.linkedin,
    'jobApplication_website': candidate.website,
    'addressSection_city': candidate.city,
    'addressSection_postalCode': '94105' // Generic default
  };

  let filledCount = 0;

  console.log("Searching for Workday inputs...");

  // Apply by ID or Automation ID
  Object.keys(workdayMap).forEach(key => {
    const selector = \`input[data-automation-id="\${key}"], input[id*="\${key}"]\`;
    const inputs = document.querySelectorAll(selector);
    inputs.forEach(input => {
      if(workdayMap[key]) {
        setNativeValue(input, workdayMap[key]);
        input.style.backgroundColor = "#e0f2fe"; // Light blue highlight
        input.style.border = "2px solid #0284c7";
        filledCount++;
      }
    });
  });

  // 2. FALLBACK STRATEGY: Label Text Matching
  // Used if automation IDs change or are custom
  if (filledCount < 3) {
      console.log("Automation IDs not found, trying fuzzy label matching...");
      const labels = Array.from(document.querySelectorAll('label'));
      labels.forEach(label => {
        const text = label.innerText.toLowerCase().trim();
        const inputId = label.getAttribute('for');
        if (!inputId) return;
        const input = document.getElementById(inputId);
        if (!input) return;

        if (text.includes('first name')) setNativeValue(input, candidate.firstName);
        else if (text.includes('last name')) setNativeValue(input, candidate.lastName);
        else if (text.includes('email')) setNativeValue(input, candidate.email);
        else if (text.includes('linkedin')) setNativeValue(input, candidate.linkedin);
        else if (text.includes('phone')) setNativeValue(input, candidate.phone);
        else if (text.includes('city')) setNativeValue(input, candidate.city);
        
        if (input.value) {
            input.style.backgroundColor = "#dcfce7"; // Green highlight for fuzzy match
            filledCount++;
        }
      });
  }

  // 3. RESUME PARSING SIMULATION (Upload simulation)
  const uploadBtn = document.querySelector('div[data-automation-id="file-upload-drop-zone"]');
  if(uploadBtn) {
      uploadBtn.style.border = "4px dashed #22c55e";
      const msg = document.createElement("div");
      msg.innerText = "HireLift: Drag your Resume PDF here!";
      msg.style.color = "#15803d";
      msg.style.fontWeight = "bold";
      uploadBtn.appendChild(msg);
  }

  alert(\`HireLift Agent: Auto-filled \${filledCount} fields on this Workday page! Check highlighted fields.\`);
})();
  `;
};