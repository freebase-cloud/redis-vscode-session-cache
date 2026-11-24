export function report(rows) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('Expected at least one sample record');
  rows=rows.map(row=>({...row}));
  for (const row of rows) {
    if (["id","user","minutes"].some(k=>row[k]==null)) throw new Error('Missing required field');
    if (typeof row.minutes==='string' && row.minutes.trim()) row.minutes=Number(row.minutes);
    if (!Number.isFinite(row.minutes)) throw new Error('Expected a numeric metric');
  }
  return {expiring:rows.filter(r=>r.minutes<10).map(r=>r.user),healthy:rows.filter(r=>r.minutes>=30).length,totalMinutes:rows.reduce((s,r)=>s+r.minutes,0)};
}
