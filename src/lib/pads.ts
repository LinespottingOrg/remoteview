export type Pads = { ideogram: string; sketch: string };

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("remote-view", 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("pads")) db.createObjectStore("pads");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function savePads(id: string, pads: Pads): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction("pads", "readwrite");
    tx.objectStore("pads").put(pads, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function loadPads(id: string): Promise<Pads | null> {
  const db = await openDb();
  const result = await new Promise<Pads | null>((resolve, reject) => {
    const tx = db.transaction("pads", "readonly");
    const req = tx.objectStore("pads").get(id);
    req.onsuccess = () => resolve((req.result as Pads | undefined) ?? null);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return result;
}

export async function deletePads(id: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction("pads", "readwrite");
    tx.objectStore("pads").delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}
