import { ConfigService } from "@nestjs/config";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose";

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
  return {
    uri: getMongoString(configService),
  };
};

const getMongoString = (configService: ConfigService) => {
  // return "mongodb://" + configService.get("MONGODB_URI");
  return configService.get("MONGODB_URI");
};
