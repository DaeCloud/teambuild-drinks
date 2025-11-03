import { NextResponse } from 'next/server';
import mariadb from 'mariadb';
import { Drink } from '../../models/drink';

import { Container, CosmosClient, Database, FeedResponse, ItemResponse, SqlQuerySpec } from '@azure/cosmos';
import { randomUUID } from 'node:crypto';

const pool = mariadb.createPool({
    host: process.env.DB_HOST || '',     // e.g. "mydb.example.com"
    user: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || '',
    connectionLimit: 5,
});

class DrinkItem {
    id?: string;
    name: string;
    status: string;
    constructor(name: string) {
        this.id = randomUUID();
        this.name = name;
        this.status = 'none';
    }
}

function ConnectDatabase() {
    return new CosmosClient("AccountEndpoint=" + process.env.COSMOS_DB_ENDPOINT || '' + ";AccountKey=" + process.env.COSMOS_DB_KEY || '' + ";");
}

export async function GET() {
    if(process.env.DEPLOYMENT?.toLocaleLowerCase().includes('azure')) {
        try {
            const cosmosClient = ConnectDatabase();
            const database: Database = cosmosClient.database(process.env.COSMOS_DB_ID || 'mydb');
            const container: Container = database.container(process.env.COSMOS_DB_CONTAINER || 'teambuild-drinks');
            const querySpec: SqlQuerySpec = {
                query: 'SELECT c.id, c.name, c.status FROM c'
            };
            const { resources: items }: FeedResponse<DrinkItem> = await container.items.query<DrinkItem>(querySpec).fetchAll();
            return NextResponse.json(items);
        } catch (err) {
            console.error(err);
            return NextResponse.json({ status: 'error', message: 'Database error' }, { status: 500 });
        }
    }

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
    if(process.env.DEPLOYMENT?.toLocaleLowerCase().includes('azure')) {
        try {
            const { name } = await request.json();
            const drinkItem = new DrinkItem(name);
            const cosmosClient = ConnectDatabase();
            const database: Database = cosmosClient.database(process.env.COSMOS_DB_ID || 'mydb');
            const container: Container = database.container(process.env.COSMOS_DB_CONTAINER || 'teambuild-drinks');
            const { resource: createdItem }: ItemResponse<DrinkItem> = await container.items.create(drinkItem);
            return NextResponse.json(createdItem);
        } catch (err) {
            console.error(err);
            return NextResponse.json({ status: 'error', message: 'Database error' }, { status: 500 });
        }
    }

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
    if(process.env.DEPLOYMENT?.toLocaleLowerCase().includes('azure')) {
        try {
            const { id, status } = await request.json();
            const cosmosClient = ConnectDatabase();
            const database: Database = cosmosClient.database(process.env.COSMOS_DB_ID || 'mydb');
            const container: Container = database.container(process.env.COSMOS_DB_CONTAINER || 'teambuild-drinks');
            const item = container.item(id);
            await item.replace({ id: id, status: status });
            return NextResponse.json({ status: 'success' });
        } catch (err) {
            console.error(err);
            return NextResponse.json({ status: 'error', message: 'Database error' }, { status: 500 });
        }
    }

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