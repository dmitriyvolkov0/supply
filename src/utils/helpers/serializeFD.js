// Функция сериализации formData
export const serializeFD = (data, parentKey, formData = new FormData()) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(parentKey ? `${parentKey}[${key}]` : key, value);
      } else if (typeof value === 'object' && !(value instanceof Date)) {
        serializeFD(value, parentKey ? `${parentKey}[${key}]` : key, formData);
      } else {
        formData.append(parentKey ? `${parentKey}[${key}]` : key, value);
      }
    });
    return formData;
}