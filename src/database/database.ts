import { PrismaClient } from '@prisma/client';
import * as config from '../../config.json';

const prisma = new PrismaClient();

// USERS

async function createUser(id: string) {
  const user = await prisma.user.create({
    data: {
      id,
      level: 1,
      cards: [],
    },
  });
  return user;
};

async function deleteUser(id: string) {
    try {
        const user = await prisma.user.delete({
            where: {id}
        });
        return user;
    } catch (e) {
        return;
    }
};

// GUILDS

async function createGuild(id: string) {
  const guild = await prisma.guild.create({
    data: {
      id,
      prefix: config.defaultPrefix,
    },
  });
  return guild;
};

export {
    createUser,
    deleteUser,
    createGuild
};