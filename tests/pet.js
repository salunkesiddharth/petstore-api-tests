import axios from "axios";
import { expect } from "chai";
import fs from "fs";

const BASE_URL = "https://petstore.swagger.io/v2";
const petId = 111115555; // hardcoding a weird petId to avoid flakiness when running the tests

describe("Petstore API - Pet Endpoint", () => {
  it("should add a new pet", async () => {
    const newPet = {
      id: petId,
      name: "Snowy",
      category: { id: 1, name: "Dogs" },
      photoUrls: ["https://example.com/snowy.jpg"],
      tags: [{ id: 1, name: "cute" }],
      status: "available",
    };

    const response = await axios.post(`${BASE_URL}/pet`, newPet, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("id");
    expect(response.data.name).to.equal(newPet.name);
  });

  it("should get a pet by ID", async () => {
    const response = await axios.get(`${BASE_URL}/pet/${petId}`);

    expect(response.status).to.equal(200);
    expect(response.data.id).to.equal(petId);
    expect(response.data).to.have.property("name");
  });

  it("should update an existing pet", async () => {
    const updatedPet = {
      id: petId,
      name: "Uno",
      category: { id: 1, name: "Dogs" },
      photoUrls: ["https://example.com/uno.jpg"],
      tags: [{ id: 1, name: "new" }],
      status: "sold",
    };

    const response = await axios.put(`${BASE_URL}/pet`, updatedPet, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data.id).to.equal(petId);
    expect(response.data.name).to.equal(updatedPet.name);
  });

  it("should delete a pet by ID", async () => {
    const response = await axios.delete(`${BASE_URL}/pet/${petId}`);

    expect(response.status).to.equal(200);
  });

  it("should get the pet inventory status", async () => {
    const response = await axios.get(`${BASE_URL}/store/inventory`);

    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("object");
  });

  it("should upload a local image for a pet", async () => {
    const imagePath = "tests/pet.jpg";

    const data = new FormData();
    data.append("file", fs.createReadStream(imagePath));

    const response = await axios.post(`${BASE_URL}/pet/${petId}/uploadImage`, data, {
      headers: {
        accept: "application/json",
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data.type).to.equal("unknown");
    expect(response.data).to.have.property("message");
  });
});
