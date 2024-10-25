package com.patchnotes.shared.serializer;

import java.io.IOException;
import java.time.LocalDate;
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
import com.patchnotes.shared.model.game.Region;
import com.patchnotes.shared.model.game.RegionReleaseDate;

public class RegionReleaseDateListDeserializer extends JsonDeserializer<List<RegionReleaseDate>> {
    public static ObjectMapper mapper = new ObjectMapper()
        .registerModule(new JavaTimeModule())
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
        .configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true)
        .configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);

    @Override
    public List<RegionReleaseDate> deserialize(JsonParser p, DeserializationContext ctxt)
        throws IOException {
            ObjectMapper mapper = (ObjectMapper) p.getCodec();
            List<Map<String, Object>> rawList = mapper.readValue(p,
            new TypeReference<List<Map<String, Object>>>() {});
        List<RegionReleaseDate> result = new ArrayList<>();

        for (Map<String, Object> item : rawList) {
            try {
                @SuppressWarnings("unchecked")
                List<Integer> dateArray = (List<Integer>) item.get("date");
                String regionStr = (String) item.get("region");

                if (dateArray != null && dateArray.size() == 3 && regionStr != null) {
                    LocalDate date = LocalDate.of(
                        dateArray.get(0),
                        dateArray.get(1),
                        dateArray.get(2)
                    );

                    RegionReleaseDate rrd = new RegionReleaseDate(
                        Region.valueOf(regionStr),
                        date
                    );
                    result.add(rrd);
                }
            } catch (Exception e) {
                // Log error but continue processing other items
                continue;
            }
        }

        return result;
    }
}
