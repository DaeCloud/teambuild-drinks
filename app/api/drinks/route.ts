import { NextResponse } from 'next/server';
import mariadb from 'mariadb';
import { Drink } from '../../models/drink';
import { stat } from 'fs';

const pool = mariadb.createPool({
    host: process.env.DB_HOST,     // e.g. "mydb.example.com"
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

export async function GET() {
    try {
        const conn = await pool.getConnection();
        const rows: Drink[] = await conn.query('SELECT id, name, status FROM Drinks');
        conn.release();
        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 'error', message: 'Database error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        const conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO Drinks (name, status) VALUES (?, ?)', [name, 'none']);
        conn.release();
        return NextResponse.json({ status: 'success' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 'error', message: 'Database error' }, { status: 500 });
    }
}

export async function UPDATE(request: Request) {
    try {
        const { id, status } = await request.json();
        const conn = await pool.getConnection();
        const result = await conn.query('UPDATE Drinks SET status = ? WHERE id = ?', [status, id]);
        conn.release();
        return NextResponse.json({ status: 'success' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 'error', message: 'Database error' }, { status: 500 });
    }
}