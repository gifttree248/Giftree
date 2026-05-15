export const inquirySchema = {
  name: "inquiry",
  title: "Inquiries",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name" },
    { name: "email", type: "string", title: "Email" },
    { name: "phone", type: "string", title: "Phone" },
    { name: "product", type: "string", title: "Product" },
    { name: "message", type: "text", title: "Message" },
    { name: "createdAt", type: "datetime", title: "Created At" },
  ],
};
