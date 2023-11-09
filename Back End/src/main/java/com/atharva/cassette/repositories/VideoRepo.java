package com.atharva.cassette.repositories;

import com.atharva.cassette.entities.VideoDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VideoRepo extends JpaRepository<VideoDetails, Integer> {

    @Override
    Optional<VideoDetails> findById(Integer integer);

    Optional<VideoDetails> findByVideoName(String name);
}
