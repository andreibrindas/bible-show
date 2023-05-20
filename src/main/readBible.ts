import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(`${process.cwd()}/bibles/bible_db.sqlite`);

export default async function readBible(
  book: string,
  chapter: number,
  contents: any
) {
  const sql = `SELECT * FROM biblia WHERE carte = ? AND capitol = ?`;

  db.all(sql, [book, chapter], (err, result: any) => {
    if (err) {
      throw err;
    }
    console.log(result);
    contents?.send('send-bible', result);
  });

  return true;
}
