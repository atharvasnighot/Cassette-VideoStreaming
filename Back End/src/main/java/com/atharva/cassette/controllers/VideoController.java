package com.atharva.cassette.controllers;

import com.atharva.cassette.entities.VideoDetails;
import com.atharva.cassette.repositories.VideoRepo;
import com.atharva.cassette.services.StreamingService;
import com.atharva.cassette.services.ThumbnailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

@RestController
public class VideoController {

    @Autowired
    private StreamingService service;

    @Autowired
    private ThumbnailService thumbnailService;

    @Autowired
    private VideoRepo videoRepo;

    @GetMapping("/allVideos")
    public List<VideoDetails> getAllVideoDetails() {
        return videoRepo.findAll();
    }

    @GetMapping("/otherVideos/{title}")
    public List<VideoDetails> getAllVideoDetailsExcept(@PathVariable String title){
        List<VideoDetails> videoDetailsList = videoRepo.findAll();
        Optional<VideoDetails> current = videoRepo.findByVideoName(title);
        videoDetailsList.remove(current.get());
        return videoDetailsList;
    }

    @GetMapping("/video/details/{title}")
    public Optional<VideoDetails> getVideoDetails(@PathVariable String title){
        return videoRepo.findByVideoName(title);
    }

    @GetMapping(value = "/video/{title}", produces = "video/mp4")
    public Mono<Resource> getVideos(@PathVariable String title) {
        System.out.println("In getVideos");
        return service.getVideo(title);
    }

    @GetMapping(value = "/thumbnail/{title}", produces = "image/jpg")
    public Mono<Resource> getThumbnail(@PathVariable String title) {
        System.out.println("In getThumbnails");
        return thumbnailService.getThumbnail(title);
    }

    @GetMapping("/video/getLikes/{title}")
    public int getLikes(@PathVariable String title){
        System.out.println("Getting Likes");
        return videoRepo.findByVideoName(title).get().getLikeCount();
    }

    @PutMapping("/video/putLikes/{title}")
    public String incrementLikeCount(@PathVariable String title){
        System.out.println("Increasing like count");

        VideoDetails currentVideoDetails = videoRepo.findByVideoName(title).get();
        int currentLikes = currentVideoDetails.getLikeCount();
        currentVideoDetails.setLikeCount(currentLikes + 1);
        videoRepo.save(currentVideoDetails);

        return "Incremented Like Count on Video " + title;
    }

    @GetMapping("/video/getDislikes/{title}")
    public int getDislikes(@PathVariable String title){
        System.out.println("Getting Dislikes");
        return videoRepo.findByVideoName(title).get().getDislikeCount();
    }

    @PutMapping("/video/putDislikes/{title}")
    public String incrementDislikeCount(@PathVariable String title){
        System.out.println("Increasing Dislike count");

        VideoDetails currentVideoDetails = videoRepo.findByVideoName(title).get();
        int currentDislikes = currentVideoDetails.getDislikeCount();
        currentVideoDetails.setDislikeCount(currentDislikes + 1);
        videoRepo.save(currentVideoDetails);

        return "Incremented Dislike Count on Video " + title;
    }
}
