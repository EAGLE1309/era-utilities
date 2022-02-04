let client = require("../index");

client.on("interactionCreate", async (interaction) => {

  /*==================== SLASH COMMAND HANDLING ====================*/
  if (interaction.isCommand()) {

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) {
      await interaction.reply({
        content: "An unknown error has occurred!",
        ephemeral: true
      });
      client.commands.delete(interaction.commandName);
      return;
    }

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);

      interaction.member = interaction.guild.members.cache.get(interaction.user.id);
    }
    if (!interaction.member.permissions.has(cmd.userPermissions || []))
      return interaction.reply({
      content: `You need \`${cmd.userPermissions}\` permission to use this command!`,
      ephemeral: true
    });
    for (let i = 0; i < cmd.options?.length; i++) {
    if (!interaction.member.permissions.has(cmd.options[i].userPermissions || [])
    return interaction.reply({
      content: `You need \`${cmd.options[i].userPermissions}\` permission to use this command!`,
      ephemeral: true
    });
    }
    cmd.run(client, interaction, args);
  }

  /*==================== CONTEXT MENU HANDLING ====================*/

  if (interaction.isContextMenu()) {
    await interaction.deferReply({
      ephemeral: false
    });
    const contextCmd = client.slashCommands.get(interaction.commandName);
    if (contextCmd) contextCmd.run(client, interaction);
  }
});
