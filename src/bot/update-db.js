/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import prisma from '../prisma';

const updateDb = client => {
  client.on('channelCreate', async channel => {
    if (channel.type === 'text') {
      const data = {
        discordId: channel.id,
        name: channel.name,
        guild: {
          connect: { discordId: channel.guild.id }
        }
      };

      await prisma.mutation.createChannel({ data });
      console.log('text channel created');
    } else {
      console.log('voice channel ignored');
    }
  });

  client.on('channelDelete', async channel => {
    if (channel.type === 'text') {
      await prisma.mutation.deleteChannel({
        where: { discordId: channel.id }
      });
      console.log('channel deleted');
    } else {
      console.log('voice channel ignored');
    }
  });

  client.on('channelUpdate', async(oldChannel, newChannel) => {
    if (oldChannel.type === 'text') {
      const data = {
        discordId: newChannel.id,
        name: newChannel.name
      };
      await prisma.mutation.updateChannel({
        where: { discordId: oldChannel.id },
        data
      });
      console.log('channel updated');
    } else {
      console.log('voice channel ignored');
    }
  });

  client.on('guildCreate', guild => {
    console.log('guild created');
  });

  client.on('guildDelete', guild => {
    console.log('guild deleted');
  });

  client.on('guildUpdate', (oldGuild, newGuild) => {
    console.log('guild updated');
  });

  client.on('guildMemberAdd', member => {
    console.log('member added');
  });

  client.on('guildMemberRemove', member => {
    console.log('member removed');
  });

  client.on('guildMemberUpdate', (oldMember, newMember) => {
    console.log('member updated');
  });
};

export default updateDb;