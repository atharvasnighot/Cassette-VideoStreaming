package com.atharva.cassette.services;

import com.atharva.cassette.entities.VideoDetails;
import com.atharva.cassette.repositories.VideoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VideoDetailsUploadService {

    @Autowired
    private VideoRepo videoRepo;

    public String saveVideoDetails(VideoDetails videoDetails){
        videoRepo.save(videoDetails);
        return videoDetails.getVideoName();
    }

}
