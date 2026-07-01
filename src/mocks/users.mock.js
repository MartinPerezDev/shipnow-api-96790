import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

import { USER_ROLES } from "../constants/userroles.js";

const availableRoles = [
    USER_ROLES.CUSTOMER,
    USER_ROLES.STORE
];

export const generateMockUser =
    async () => {

        const password =await bcrypt.hash("coder123", 10);

        return {

            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email().toLowerCase(),
            password,
            role: faker.helpers.arrayElement(availableRoles),
            documents: []

        };

};

export const generateMockUsers =
    async (quantity) => {

        return await Promise.all(Array.from({length: quantity}, () => generateMockUser()));

};


