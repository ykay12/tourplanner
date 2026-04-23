FROM maven:latest AS build

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean package -DskipTests

FROM amazoncorretto:25

WORKDIR /app
COPY --from=build /app/target/*.jar /app/hibernatejpa.jar
ENTRYPOINT ["java", "-jar", "/app/hibernatejpa.jar"]
