# Use a Maven image to build the project
FROM maven:3.9.9-eclipse-temurin-21 AS build
COPY --from=shared:latest /root/.m2 /root/.m2
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk
# Set the working directory
WORKDIR /opt/app
#ENV PORT 8081
# Expose the port on which the application will run
EXPOSE 8083
# Copy the application JAR file to the container
COPY --from=build /app/target/*.jar app.jar
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]