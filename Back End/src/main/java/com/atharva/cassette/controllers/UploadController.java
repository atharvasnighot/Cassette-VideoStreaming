package com.atharva.cassette.controllers;

import com.atharva.cassette.entities.VideoDetails;
import com.atharva.cassette.services.ThumbnailUploadService;
import com.atharva.cassette.services.VideoDetailsUploadService;
import com.atharva.cassette.services.VideoUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/upload")
public class UploadController {

    @Autowired
    private ThumbnailUploadService thumbnailUploadService;

    @Autowired
    private VideoUploadService videoUploadService;

    @Autowired
    private VideoDetailsUploadService videoDetailsUploadService;

    @PostMapping("/videoDetails")
    public ResponseEntity<?> uploadVideoDetails(@RequestBody VideoDetails newVideo){
        System.out.println(newVideo.getVideoName());
        String videoName = videoDetailsUploadService.saveVideoDetails(newVideo);
        return ResponseEntity.status(HttpStatus.OK).body(videoName + "Video Saved");
    }

    @PostMapping("/thumbnail/{title}")
    public ResponseEntity<?> uploadImageToFileSystem(@RequestParam("image") MultipartFile file, @PathVariable String title) throws IOException {
        String uploadImage = thumbnailUploadService.uploadAndCompressImage(file, title);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @PostMapping("/video/{title}")
    public ResponseEntity<?> uploadVideoToFileSystem(@RequestParam("video") MultipartFile file, @PathVariable String title) throws IOException {
        String uploadImage = videoUploadService.uploadVideo(file, title);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }
}
