const graphql = require('graphql');
const Guild = require('../models/guildModel');
const Channel = require('../models/channelModel');

const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;

const GuildType = new GraphQLObjectType({
  name: 'Guild',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const ChannelType = new GraphQLObjectType({
  name: 'Channel',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    guild: {
      type: GuildType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Guild.findOne({ id: args.id });
      }
    },
    channel: {
      type: ChannelType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Channel.findOne({ id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});