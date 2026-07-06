import { faker } from "@faker-js/faker";

export const generateMockStore = (ownerId)=>{

    return{

        name:faker.company.name(),
        email:faker.internet.email(),
        address:faker.location.streetAddress(),
        owner: ownerId

    };

};

export const generateMockStores = (qty, users)=>{

   return Array.from(

      { length: qty },

      ()=>{

         const randomUser =
            users[
               Math.floor(
                  Math.random()*users.length
               )
            ];

         return generateMockStore(
            randomUser._id
         );

      }

   );

};