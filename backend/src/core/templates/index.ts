export const getUserHelpRequestTemplate = (data) => {
  return `Dear ${data.email},

Thank you for reaching out to us for assistance. We have received your help request and our team is working on it. You can expect to hear back from us shortly.

If you have any further questions or concerns, please feel free to contact us at [yana@digiway.dev].

Best regards,
The Music Market Team`;
};

export const getModerHelpRequestTemplate = (data) => {
  return `Hello,

A new help request has been registered from user ${data.email}. Please make sure to attend to this request promptly and provide the necessary assistance.

Help description:

Title: 
${data.title}

Description:
${data.text}`;
};
