// src/services/leadSubmission.js
// Stub for form submission — currently logs to console and resolves.
// When a real backend/CRM integration is decided (HubSpot, Node endpoint, etc.),
// replace the body of this function. The function signature stays the same,
// so no component changes are needed.

/**
 * submitLead — sends form data to the backend.
 * @param {object} formData - the form values keyed by field name
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitLead(formData) {
  // eslint-disable-next-line no-console
  console.log('[TrakID] Lead submission:', formData);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    message: 'Submission received.',
  };
}
