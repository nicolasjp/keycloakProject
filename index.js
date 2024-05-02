const path = require('path');
const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const memoryStore = new session.MemoryStore();

app.set('view engine', 'ejs');
app.set('views', require('path').join(__dirname, '/view'));
app.use(express.static('static'));
app.use(session({
    secret: 'KWhjV<T=-*VW<;cC5Y6U-{F.ppK+])Ub',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}));

const keycloak = new Keycloak({
    store: memoryStore,
});

app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/',
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.redirect('/home'));

const parseToken = raw => {
    if (!raw || typeof raw !== 'string') return null;

    try {
        raw = JSON.parse(raw);
        const token = raw.id_token ? raw.id_token : raw.access_token;
        const content = token.split('.')[1];

        return JSON.parse(Buffer.from(content, 'base64').toString('utf-8'));
    } catch (e) {
        console.error('Error while parsing token: ', e);
    }
};

app.get('/home', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        console.log(details);
        // console.log(details.realm_access.roles);
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
        embedded_params.role = "";

        for (let i = 0; i < details.role.length; i++) {
            if(details.role[i].includes('ResponsableCyber')){
                embedded_params.role = details.role[i];
                break;
            }
            else if(details.role[i].includes('ChargeTDCyber')){
                embedded_params.role = details.role[i];
            }
            else if(details.role[i].includes('ResponsableIA')){
                embedded_params.role = details.role[i];
                break;
            }
            else if(details.role[i].includes('ChargeTDIA')){
                embedded_params.role = details.role[i];
            }
            else if(details.role[i].includes('ResponsableManagement')){
                embedded_params.role = details.role[i];
                break;
            }
            else if(details.role[i].includes('ChargeTDManagement')){
                embedded_params.role = details.role[i];
            }
            else if(details.role[i].includes('Moniteur')){
                embedded_params.role = details.role[i];
                break;
            }
            else if(details.role[i].includes('Enseignant')){
                embedded_params.role = details.role[i];
                break;
            }
        }
    }

    res.render('home', {
        user: embedded_params,
    });
});

app.get('/login', keycloak.protect(), (req, res) => {
    return res.redirect('home');
});


app.get('/gestionNotesCyber', 
        keycloak.enforcer(['notesCyber:read'], {resource_server_id: 'my-application-project'}),
        keycloak.enforcer(['notesCyber:write'], {resource_server_id: 'my-application-project'}),
(req, res) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        console.log(details);
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
        embedded_params.role = "";

        for (let i = 0; i < details.role.length; i++) {
            if(details.role[i].includes('ResponsableCyber')){
                embedded_params.role = details.role[i];
                break;
            }
            else if(details.role[i].includes('ChargeTDCyber')){
                embedded_params.role = details.role[i];
            }
        }
    }
 
    const donneesBrutes = fs.readFileSync("notes.json", 'utf-8');
    const donnees = JSON.parse(donneesBrutes);
    const donneesCybersecurite = donnees.filter(element => element.ue === 'Cybersécurité');
    // console.log(donneesCybersecurite);
    res.status(200).render('affichageNote', { user: embedded_params, notes: donneesCybersecurite});
});


app.get('/gestionNotesIA', 
        keycloak.enforcer(['notesIA:read'], {resource_server_id: 'my-application-project'}),
        keycloak.enforcer(['notesIA:write'], {resource_server_id: 'my-application-project'}),
(req, res) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        console.log(details);
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
        embedded_params.role = "";

        for (let i = 0; i < details.role.length; i++) {
            if(details.role[i].includes('ResponsableIA')){
                embedded_params.role = details.role[i];
                break;
            }
            else if(details.role[i].includes('ChargeTDIA')){
                embedded_params.role = details.role[i];
            }
        }
    }
 
    const donneesBrutes = fs.readFileSync("notes.json", 'utf-8');
    const donnees = JSON.parse(donneesBrutes);
    const donneesIA = donnees.filter(element => element.ue === 'IA');
    // console.log(donneesIA);
    res.status(200).render('affichageNote', { user: embedded_params, notes: donneesIA});
});

app.get('/gestionNotesMana', 
        keycloak.enforcer(['notesMana:read'], {resource_server_id: 'my-application-project'}),
        keycloak.enforcer(['notesMana:write'], {resource_server_id: 'my-application-project'}),
(req, res) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        console.log(details);
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
        embedded_params.role = "";

        for (let i = 0; i < details.role.length; i++) {
            if(details.role[i].includes('ResponsableManagement')){
                embedded_params.role = details.role[i];
                break;
            }
            else if(details.role[i].includes('ChargeTDManagement')){
                embedded_params.role = details.role[i];
            }
        }
    }
 
    const donneesBrutes = fs.readFileSync("notes.json", 'utf-8');
    const donnees = JSON.parse(donneesBrutes);
    const donneesMana = donnees.filter(element => element.ue === 'Management');
    // console.log(donneesMana);
    res.status(200).render('affichageNote', { user: embedded_params, notes: donneesMana});
});

app.get('/gestionAllNotes', 
        keycloak.enforcer(['notesCyber:read'], {resource_server_id: 'my-application-project'}),
        keycloak.enforcer(['notesIA:read'], {resource_server_id: 'my-application-project'}),
        keycloak.enforcer(['notesMana:read'], {resource_server_id: 'my-application-project'}),
(req, res) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        console.log(details);
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
        embedded_params.role = "";

        for (let i = 0; i < details.role.length; i++) {
            if(details.role[i].includes('Enseignant')){
                embedded_params.role = details.role[i];
                break;
            }
        }
    }
 
    const donneesBrutes = fs.readFileSync("notes.json", 'utf-8');
    const donnees = JSON.parse(donneesBrutes);
    res.status(200).render('affichageNote', { user: embedded_params, notes: donnees});
});

app.get('/notesCyber/validate', 
        keycloak.enforcer(['notesCyber:validate'], {resource_server_id: 'my-application-project'}),
(req, res) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        console.log(details);
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
        embedded_params.role = "";

        for (let i = 0; i < details.role.length; i++) {
            if(details.role[i].includes('ResponsableCyber')){
                embedded_params.role = details.role[i];
                break;
            }
        }
    }
 
    const donneesBrutes = fs.readFileSync("notes.json", 'utf-8');
    const donnees = JSON.parse(donneesBrutes);
    const donneesCybersecurite = donnees.filter(element => element.ue === 'Cybersécurité');
    // console.log(donneesCybersecurite);
    res.status(200).render('validationNote', { user: embedded_params, notes: donneesCybersecurite});
});

app.get('/notesIA/validate', 
        keycloak.enforcer(['notesIA:validate'], {resource_server_id: 'my-application-project'}),
(req, res) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        console.log(details);
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
        embedded_params.role = "";

        for (let i = 0; i < details.role.length; i++) {
            if(details.role[i].includes('ResponsableIA')){
                embedded_params.role = details.role[i];
                break;
            }
        }
    }
 
    const donneesBrutes = fs.readFileSync("notes.json", 'utf-8');
    const donnees = JSON.parse(donneesBrutes);
    const donneesIA = donnees.filter(element => element.ue === 'IA');
    // console.log(donneesIA);
    res.status(200).render('validationNote', { user: embedded_params, notes: donneesIA});
});

app.get('/notesMana/validate', 
        keycloak.enforcer(['notesMana:validate'], {resource_server_id: 'my-application-project'}),
(req, res) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        console.log(details);
        embedded_params.name = details.name;
        embedded_params.email = details.email;
        embedded_params.username = details.preferred_username;
        embedded_params.role = "";

        for (let i = 0; i < details.role.length; i++) {
            if(details.role[i].includes('ResponsableManagement')){
                embedded_params.role = details.role[i];
                break;
            }
        }
    }
 
    const donneesBrutes = fs.readFileSync("notes.json", 'utf-8');
    const donnees = JSON.parse(donneesBrutes);
    const donneesMana = donnees.filter(element => element.ue === 'Management');
    // console.log(donneesMana);
    res.status(200).render('validationNote', { user: embedded_params, notes: donneesMana});
});

app.post('/ajouterNote', (req, res) => {
    // Récupérer les données du formulaire depuis le corps de la requête
    const nouvelleNote = {
        ue: req.body.ue,
        numero_etudiant: req.body.numero_etudiant,
        note: req.body.note,
        validation: req.body.validation
    };

    // Lire le fichier JSON existant
    const fichierJSON = fs.readFileSync('notes.json', 'utf-8');
    const donneesJSON = JSON.parse(fichierJSON);

    // Ajouter la nouvelle note aux données JSON
    donneesJSON.push(nouvelleNote);

    // Réécrire le fichier JSON avec les nouvelles données
    fs.writeFileSync('notes.json', JSON.stringify(donneesJSON));

    // Répondre au client
    res.json({ message: 'Note ajoutée avec succès' });
});

app.post('/validerNotes', (req, res) => {
    const ue = req.body.ue;
    // console.log(ue);
    // Récupérer les données JSON du fichier
    const fichierJSON = fs.readFileSync('notes.json', 'utf-8');
    const donneesJSON = JSON.parse(fichierJSON);

    // Mettre à jour les données JSON (par exemple, marquer toutes les notes comme validées)
    donneesJSON.forEach(note => {
        if(note.ue==ue)
            note.validation = "✅";
    });

    // Réécrire le fichier JSON avec les nouvelles données
    fs.writeFileSync('notes.json', JSON.stringify(donneesJSON));

    // Répondre au client
    res.json({ message: 'Notes validées avec succès' });
});


app.use((req, res, next) => {
    return res.status(404).end('Not Found');
});

app.use((err, req, res, next) => {
    return res.status(req.errorCode ? req.errorCode : 500).end(req.error ? req.error.toString() : 'Internal Server Error');
});

const server = app.listen(3000, '127.0.0.1', () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Application running at http://%s:%s', host, port);
});
