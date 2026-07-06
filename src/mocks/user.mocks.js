import { faker } from "@faker-js/faker";
import { USER_ROLES } from "../constansts/userRoles.js";

export const generateMockUser = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: USER_ROLES.CUSTOMER
    }
}

export const generateMockUsers = (count) => {
    return Array.from({ length: count }, () => generateMockUser());
}

