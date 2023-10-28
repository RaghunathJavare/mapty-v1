export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error('could not found city map try once again');
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


