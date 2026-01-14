export function prepareFormData(formData: FormData) {
  const data: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    // Skip empty strings
    if (value === "") continue;
    data[key] = value;
  }

  return data;
}
