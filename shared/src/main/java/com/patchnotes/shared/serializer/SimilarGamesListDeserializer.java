package com.patchnotes.shared.serializer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.patchnotes.shared.model.game.SimilarGames;

public class SimilarGamesListDeserializer extends JsonDeserializer<List<SimilarGames>> {
    public static ObjectMapper mapper = new ObjectMapper()
        .registerModule(new JavaTimeModule())
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
        .configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true)
        .configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);

    @Override
    public List<SimilarGames> deserialize(JsonParser p, DeserializationContext ctxt)
            throws IOException {
        mapper = (ObjectMapper) p.getCodec();
        List<Map<String, Object>> rawList = mapper.readValue(p,
            new TypeReference<List<Map<String, Object>>>() {});
        List<SimilarGames> result = new ArrayList<>();

        for (Map<String, Object> item : rawList) {
            try {
                Long id = Long.valueOf(item.get("id").toString());
                String name = (String) item.get("name");

                SimilarGames sg = new SimilarGames(id, name);
                // Set the id as igdbId since that's what we want
                sg.setIgdbId(id);
                result.add(sg);
            } catch (Exception e) {
                // Log error but continue processing other items
                continue;
            }
        }

        return result;
    }
}