FROM maven:3.8-openjdk-17 AS shared-build
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn install