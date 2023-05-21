// const sqlite3 = require('sqlite3');
import sqlite from 'sqlite3';

const sqlite3 = sqlite.verbose();

const db = new sqlite3.Database(`${process.cwd()}/bibles/bible_db.sqlite`);

export default async function readBible(
  book: string,
  chapter: number,
  contents: any
) {
  const sql = `SELECT * FROM biblia WHERE carte = ? AND capitol = ?`;

  db.all(sql, [book, chapter], (err: any, result: any) => {
    if (err) {
      throw err;
    }
    console.log(result);
    contents?.send('send-bible', result);
  });

  return true;
}
