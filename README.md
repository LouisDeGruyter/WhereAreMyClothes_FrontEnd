# Examenopdracht Front-end Web Development 

- Student: LOUIS DE GRUYTER
- Studentennummer: 180978ld
- E-mailadres: louis.degruyter@student.hogent.be

## Opstarten  
1) Maak .env bestand aan met volgende variabelen:
```.env
REACT_APP_API_URL=url of your webservice
REACT_APP_AUTH0_DOMAIN=your auth0 domain
REACT_APP_AUTH0_CLIENT_ID=your auth0 clientid
REACT_APP_AUTH0_API_AUDIENCE=your unique auth0 id for the webservice
```
2) Voer de volgende commando(s) uit:    
yarn start  

## Testen  
1) Maak een cypress.env.json bestand aan met de volgende code:  
```json
{
  "auth_audience": "{YOUR_API_IDENTIFIER}",
  "auth_url": "https://{YOUR_DOMAIN}/oauth/token",
  "auth_client_id": "{YOUR_CLIENT_ID}",
  "auth_client_secret": "{YOUR_CLIENT_SECRET}",
  "auth_username": "{YOUR_TEST_USERNAME}",
  "auth_password": "{YOUR_TEST_PASSWORD}"
}
```
  2) Voer de volgende commando(s) uit:    
  yarn cypress open  
  3) In de geopende cypress applicatie, klik op E2E Testing
  4) Selecteer chrome als browser en druk op 'Start E2E Testing in Chrome'
  5) Klik op de E2E spec die je wilt testen

