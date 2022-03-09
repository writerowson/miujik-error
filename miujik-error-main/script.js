const elementById = (id) => {
  // console.log(id)
  return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));
  keyword.value = ""
};

const showArtists = ({ artists }) => {
  const artistContainer = elementById("artists");
  console.log(artistContainer)
  artists.forEach((artist) => {
    const div = document.createElement("div");
    console.log(artist)
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb ? artist.strArtistThumb : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3lC0SfgqCcTGipFh64hddM6xgBYQj90wOA&usqp=CAU"}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist ? artist.strArtist : "Not available"}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "Not available"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : "Not available"}</p>
  </div>
  <button onclick="fetchAlbums('${artist.idArtist ? artist.idArtist : "Not available"}')"  class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album));
  const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";

};

const showAlbum = (data) => {
  const albumContainer = elementById("albums");
  data.forEach((album) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
    //       <div class="album-image-container">
    //         <img
    //           src="${album.strAlbumThumb}"
    //           alt=""
    //         />
    //       </div>
    //       <div class="album-name">
    //         <h3>${album.strAlbum}</h3>
    //       </div>
    //     `;

    albumContainer.appendChild(div);
  });
};
