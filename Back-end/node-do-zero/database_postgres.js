import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DataBasePostgres {

    async list(search) {
        let videos;

        if (search) {
            videos = await sql`SELECT * FROM videos WHERE title ILIKE ${'%' + search + '%'}`;
        } else {
            videos = await sql`SELECT * FROM videos`;
        }
        return videos;
    }

    async create(video) {
        const videoId = randomUUID();
        const { title, description, duration } = video;

        await sql`
            INSERT INTO videos (id, title, description, duration)
            VALUES (${videoId}, ${title}, ${description}, ${duration})
        `;
    }

    async update(id, video) {
        const { title, description, duration } = video;

        await sql`
            UPDATE videos
            SET title = ${title}, description = ${description}, duration = ${duration}
            WHERE id = ${id}
        `;
    }

    async delete(id) {
        await sql`DELETE FROM videos WHERE id = ${id}`;
    }
}
