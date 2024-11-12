import axios from "axios";
import { expect } from "chai";
import fs from "fs";

const BASE_URL = "https://petstore.swagger.io/v2";
const petId = 111115555; // Hardcoding a unique petId to reduce flakiness

function createPetData(name, status) {
  return {
    id: petId,
    name,
    category: { id: 1, name: "Dogs" },
    photoUrls: [`https://example.com/${name.toLowerCase()}.jpg`],
    tags: [{ id: 1, name: status }],
    status,
  };
}

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

describe("Petstore API - Pet Endpoint", () => {
  describe("Pet Operations", () => {
    it("should add a new pet", async () => {
      const newPet = createPetData("Snowy", "available");

      try {
        const response = await axios.post(`${BASE_URL}/pet`, newPet, axiosConfig);

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property("id");
        expect(response.data.name).to.equal(newPet.name);
      } catch (error) {
        console.error("Error adding a new pet:", error.response ? error.response.data : error.message);
        throw error;
      }
    });

    it("should get a pet by ID", async () => {
      try {
        const response = await axios.get(`${BASE_URL}/pet/${petId}`, axiosConfig);

        expect(response.status).to.equal(200);
        expect(response.data.id).to.equal(petId);
        expect(response.data).to.have.property("name");
      } catch (error) {
        console.error("Error fetching pet by ID:", error.response ? error.response.data : error.message);
        throw error;
      }
    });

    it("should update a pet with form data", async () => {
      const formData = new URLSearchParams();
      formData.append("name", "Coco");
      formData.append("status", "sold");

      try {
        const response = await axios.post(`${BASE_URL}/pet/${petId}`, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        expect(response.status).to.equal(200);
        expect(response.data).to.be.an("object");
        expect(response.data).to.have.property("message");
      } catch (error) {
        console.error("Error updating pet with form data:", error.response ? error.response.data : error.message);
        throw error;
      }
    });

    it("should update an existing pet", async () => {
      const updatedPet = createPetData("Uno", "sold");

      try {
        const response = await axios.put(`${BASE_URL}/pet`, updatedPet, axiosConfig);

        expect(response.status).to.equal(200);
        expect(response.data.id).to.equal(petId);
        expect(response.data.name).to.equal(updatedPet.name);
      } catch (error) {
        console.error("Error updating an existing pet:", error.response ? error.response.data : error.message);
        throw error;
      }
    });

    it("should upload a local image for a pet", async () => {
      const imagePath = "tests/data/pet.jpg";

      const data = new FormData();
      data.append("file", fs.createReadStream(imagePath));

      try {
        const response = await axios.post(`${BASE_URL}/pet/${petId}/uploadImage`, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        expect(response.status).to.equal(200);
        expect(response.data.type).to.equal("unknown");
        expect(response.data).to.have.property("message");
      } catch (error) {
        console.error("Error uploading image for a pet:", error.response ? error.response.data : error.message);
        throw error;
      }
    });

    it("should find pets by status", async () => {
      const status = "available";

      try {
        const response = await axios.get(`${BASE_URL}/pet/findByStatus`, {
          params: { status },
          axiosConfig,
        });

        expect(response.status).to.equal(200);
        expect(response.data).to.be.an("array");
        if (response.data.length > 0) {
          expect(response.data[0]).to.have.property("id");
          expect(response.data[0]).to.have.property("status").that.equals(status);
        }
      } catch (error) {
        console.error("Error finding pets by status:", error.response ? error.response.data : error.message);
        throw error;
      }
    });

    it("should delete a pet by ID", async () => {
      try {
        const response = await axios.delete(`${BASE_URL}/pet/${petId}`, axiosConfig);

        expect(response.status).to.equal(200);
      } catch (error) {
        console.error("Error deleting a pet by ID:", error.response ? error.response.data : error.message);
        throw error;
      }
    });
  });
});
