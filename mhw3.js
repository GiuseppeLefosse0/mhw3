function click_raggiungi(event)
{
  const new_img = document.createElement('img');
  new_img.src = 'https://th.bing.com/th/id/OIP.hjnFQOlIP8CAzd5lP4rIdwHaEI?w=282&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7';
  
  const container = document.querySelector('.section-container')
  container.innerHTML = ''
  container.appendChild(new_img);
}

const image = document.querySelector('.section-img');
image.addEventListener('click', click_raggiungi);


function click_leggi(event){
    event.preventDefault();
    const p = document.querySelector('#p1')
    if(p.classList.contains('hidden-p1') && p.dataset.paragraph === 'paragrafo-nascosto'){
        p.classList.remove('hidden-p1')
    }
    else{
        p.classList.add('hidden-p1')
    }

}
const a = document.querySelector('.leggi-di-più')
a.addEventListener('click',click_leggi)

function OnClickMenu(event){
  event.preventDefault()
  const vertical_menu = document.querySelector('#vertical-menu')
  if(vertical_menu.classList.contains('menu-hidden')){
    vertical_menu.classList.remove('menu-hidden')
  }
  else{
    vertical_menu.classList.add('menu-hidden')
  }
}

const menu_hidden = document.querySelector('.container-menu').addEventListener('click', OnClickMenu)



/* --- API RESTful ---*/


function onResponse(response){
  console.log('Risposta Ricevuta')
  return response.json()
}

function onJson(json){
  console.log('JSON ricevuto')
  console.log(json)


const playlistSection = document.querySelector('#playlist-view');
  

const playlists = json.playlists.items;
let num_results = playlists.length;

if(num_results > 3)
num_results = 3;

for(let i=0; i<num_results; i++){


  const playlist=playlists[i];

  const playlistContainer = document.createElement('div');
  playlistContainer.classList.add('playlist-item');
  
 
  const playlistImage = document.createElement('img');
  playlistImage.src = playlist.images[0].url;
  playlistContainer.appendChild(playlistImage);
  
  
  const playlistName = document.createElement('span');
  playlistName.textContent = playlist.name;
  playlistContainer.appendChild(playlistName);
  
 
  playlistSection.appendChild(playlistContainer);
}


}

function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
  
  fetch("https://api.spotify.com/v1/search?type=playlist&q=hardworkout",
  {
    headers:
    {
      'Authorization': 'Bearer ' + token
    }
  }
  ).then(onResponse).then(onJson);



}

function onTokenResponse(response)
{
  return response.json();
}



const client_id='a65263ae5f1444c9a96b3f8eac2e1745'
const client_secret='561aae810ec9419ea9b2311b5f294efa'

let token;

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);


/*---------------------- */

function onJson2(json) {
  console.log('JSON ricevuto');
  console.log(json);

  const exerciseSection = document.querySelector('#exercise-view');
  

const exercise_list = json.exercise_list;
let num_results = exercise_list.length

if(num_results > 4)
   num_results = 4;

for(let i=0; i<num_results; i++){


  const exercise=exercise_list[i];
  
  const exerciseName = document.createElement('p');
  exerciseName.textContent = exercise.name;
  
  const exercise_difficulty=document.createElement('p');
  exercise_difficulty.textContent = exercise.difficulty;


  exerciseSection.appendChild(exerciseName);
  exerciseSection.appendChild(exercise_difficulty);
}
}

function onResponse2(response) {
  console.log('Risposta ricevuta');
  return response.json();
}


function search(event)
{

  event.preventDefault();

  const exercise_list = document.querySelector('#exercise-show');
  const exercise_group = encodeURIComponent(exercise_list.value);
  console.log('Eseguo ricerca: ' + exercise_group);
 
  rest_url = 'https://api.api-ninjas.com/v1/exercises?muscle=' + exercise_group ;
  console.log('URL: ' + rest_url);
  
  fetch(rest_url,
    {
      headers:
      {
        'X-Api-Key': api_key
      }
    }
  ).then(onResponse2).then(onJson2);
}

const api_key= 'inGg4Hyj6TYxK6LeIgASgw==WjxWMciUYa5d0g4k'

const form = document.querySelector("form").addEventListener('submit', search)
