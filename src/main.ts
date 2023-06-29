import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: "https://food-delivery-app-reactjs.vercel.app/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Headers"],
  };
  app.enableCors(corsOptions);
  app.setGlobalPrefix("api");
  await app.listen(3000);
}
bootstrap();
