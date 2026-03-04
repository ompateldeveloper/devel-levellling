import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";

const yoga = createYoga({
    schema,
    graphqlEndpoint: "/api/graphql",
    fetchAPI: {
        Response,
        Request,
    },
});

export { yoga as GET, yoga as POST };
