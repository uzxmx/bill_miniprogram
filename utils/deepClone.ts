export default function deepClone(obj: any) {
  if (!obj) {
    return obj;
  }

  let v;
  let clone = Array.isArray(obj) ? [] : {};
  for (const k in obj) {
    v = obj[k];
    // @ts-ignore
    clone[k] = (typeof v === "object") ? deepClone(v) : v;
  }

  return clone;
}
