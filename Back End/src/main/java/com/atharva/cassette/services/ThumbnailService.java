package com.atharva.cassette.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ThumbnailService {

    private static final String FORMAT="classpath:static/thumbnails/%s.jpg";

    @Autowired
    private ResourceLoader resourceLoader;

    public Mono<Resource> getThumbnail(String title){
        System.out.println(title);
        return Mono.fromSupplier(()->resourceLoader.
                getResource(String.format(FORMAT,title)))   ;
    }

}
