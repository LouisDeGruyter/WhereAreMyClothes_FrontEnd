# Examenopdracht Front-end Web Development / Web Services

> Schrap hierboven wat niet past

- Student: LOUIS DE GRUYTER
- Studentennummer: 180978ld
- E-mailadres: louis.degruyter@student.hogent.be

## Opstarten  
1) Maak .env bestand aan met volgende variabelen:
REACT_APP_API_URL="https://webservices-louisdegruyter.onrender.com/api"  
REACT_APP_AUTH0_DOMAIN="web-louisdg.eu.auth0.com"  
REACT_APP_AUTH0_CLIENT_ID="YpzFIr48ow6UeAC6iK7AR0u7YIRKAkVd"  
REACT_APP_AUTH0_API_AUDIENCE="https://api/web-louisdg"  
2) Voer de volgende commando(s) uit:    
yarn start  

## Testen  
1) Maak een cypress.env.json bestand aan met de volgende code:  
```js
{
    "auth_audience": "https://api/web-louisdg",
    "auth_url": "https://web-louisdg.eu.auth0.com/oauth/token",
    "auth_client_id": "YpzFIr48ow6UeAC6iK7AR0u7YIRKAkVd",
    "auth_client_secret": "iv1v7WGS7kZAixDs68Hf7rekyX7rq1Xx01axPl62koJof92FZ8pw_eJj7ApdlTOk",
    "auth_username": "e2e-testing@gmail.be",
    "auth_password": "e2e-testing"
  }```  
  2) Voer de volgende commando(s) uit:    
  yarn cypress open  
  3) In de geopende cypress applicatie, klik op E2E Testing
  4) Selecteer chrome als browser en druk op 'Start E2E Testing in Chrome'
  5) Klik op de E2E spec die je wilt testen

