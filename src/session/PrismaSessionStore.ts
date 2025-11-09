import { Store } from "express-session";
import prisma from "../prisma/prisma.client";

export class PrismaSessionStore extends Store {
  async get(sid: string, callback: (err: any, session?: any) => void) {
    try {
      const record = await prisma.session.findUnique({ where: { sid } });
      if (!record) return callback(null, undefined);
      const session = JSON.parse(record.data);
      callback(null, session);
    } catch (err) {
      callback(err);
    }
  }

  async set(sid: string, session: any, callback?: (err?: any) => void) {
    try {
      const data = JSON.stringify(session);
      const expiresAt = session.cookie?.expires ? new Date(session.cookie.expires) : null;

      await prisma.session.upsert({
        where: { sid },
        update: { data, expiresAt },
        create: { sid, data, expiresAt },
      });

      callback?.();
    } catch (err) {
      callback?.(err);
    }
  }

  async destroy(sid: string, callback?: (err?: any) => void) {
    try {
      await prisma.session.delete({ where: { sid } });
      callback?.();
    } catch (err) {
      callback?.();
    }
  }
}
