const subject = `Mot de passe oublié`;

const html = `<p>Bonjour <%= user.firstname %>,</p>
<p>Vous avez fait une demande de réinitialisation du mot de passe.<br>Veuillez cliquer sur ce lien pour définir un nouveau mot de passe: <%= url %></p>
<br><br>Cordialement,<br>L'équipe Tumeplay.`;

const text = `Bonjour <%= user.firstname %>
Vous avez fait une demande de réinitialisation du mot de passe. Veuillez cliquer sur ce lien pour définir un nouveau mot de passe: <%= url %>
Cordialement, L'équipe Tumeplay.`;

module.exports = {
  subject,
  text,
  html,
};
