import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

import { USER_ROLES } from "../constants/userroles.js";

const availableRoles = [
    USER_ROLES.CUSTOMER,
    USER_ROLES.STORE
];

export const generateMockUser = async (role = USER_ROLES.CUSTOMER) => {
    const password = await bcrypt.hash("coder123", 10);

    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        password,
        role,
        documents: []
    };
};

export const generateMockUsers = async (quantity, role) => {
    return Promise.all(
        Array.from({ length: quantity }, () => generateMockUser(role))
    );
};
