let breweryData = [];
let searchData = [];

function search() {
  const value = document.getElementById("inputBox").value.trim();
  if (value === "") {
    searchData = breweryData;
  } else {
    const filteredData = breweryData.filter((data) =>
      data.name.toLowerCase().includes(value.toLowerCase())
    );
    searchData = filteredData;
  }

  renderDetails();
}

async function fetchData() {
  try {
    const response = await fetch("https://api.openbrewerydb.org/breweries/");
    const data = await response.json();

    data.sort((a, b) => {
      if (a.name.common < b.name.common) {
        return -1;
      }
      if (a.name.common > b.name.common) {
        return 1;
      }
      return 0;
    });

    breweryData = data;
    searchData = data;
    renderDetails();
  } catch (error) {
    console.log(error);
  }
}

function renderDetails() {
  const detailsContainer = document.getElementById("detailsContainer");
  detailsContainer.innerHTML = "";

  if (searchData.length > 0) {
    searchData.forEach((data) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";

      const containerDiv = document.createElement("div");
      containerDiv.className = "container";

      const nameParagraph = document.createElement("p");
      const nameText = document.createTextNode(
        `${data.name} - ${data.brewery_type}`
      );
      nameParagraph.appendChild(nameText);

      const addressParagraph = document.createElement("p");
      const addressText = document.createTextNode(
        `${data.address_1}, ${data.city}, ${data.state_province}, ${data.country} - ${data.postal_code}`
      );
      addressParagraph.appendChild(addressText);

      const websiteLink = document.createElement("a");
      websiteLink.href = data.website_url;
      const websiteText = document.createTextNode(
        `Website : ${data.website_url}`
      );
      websiteLink.appendChild(websiteText);

      const phoneParagraph = document.createElement("p");
      const phoneText = document.createTextNode(`Phone : ${data.phone}`);
      phoneParagraph.appendChild(phoneText);

      containerDiv.appendChild(nameParagraph);
      containerDiv.appendChild(addressParagraph);
      containerDiv.appendChild(websiteLink);
      containerDiv.appendChild(phoneParagraph);

      cardDiv.appendChild(containerDiv);
      detailsContainer.appendChild(cardDiv);
    });
  } else {
    const noDataParagraph = document.createElement("p");
    noDataParagraph.textContent = "No results found.";
    detailsContainer.appendChild(noDataParagraph);
  }
}

window.onload = () => {
  fetchData();
};
