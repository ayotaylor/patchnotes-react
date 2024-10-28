FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /build
# Copy shared project files
COPY pom.xml ./
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean install -DskipTests
# Use a minimal base image to store the built jar and maven repository
FROM alpine:latest
# Copy the built jar and maven repository
COPY --from=build /build/target/shared-0.0.1-SNAPSHOT.jar /shared.jar
COPY --from=build /root/.m2 /root/.m2