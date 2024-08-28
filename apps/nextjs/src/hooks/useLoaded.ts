import { useLayoutEffect, useState } from "react";

export function useLoaded() {
  const [loaded, setLoaded] = useState<boolean>(false);
  useLayoutEffect(() => setLoaded(true), []);
  return loaded;
}
