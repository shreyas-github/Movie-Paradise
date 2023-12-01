import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{

  constructor(private service:MovieApiServiceService,private router:ActivatedRoute) {}


  movieDetailsResult:any;
  movieVideoResult:any;
  movieCastResult:any;

  ngOnInit(): void {
    let getParamsId = this.router.snapshot.paramMap.get('id');
    console.log(getParamsId,'getparamid#');
    
    this.getMovie(getParamsId);
    this.getVideo(getParamsId);
    this.getMovieCast(getParamsId);
  }

  getMovie(id:any){
    this.service.getMovieDetails(id).subscribe((result)=>{
      console.log(result,'getMovieDetails#');
      this.movieDetailsResult = result;
    });
  }

  getVideo(id:any){
    this.service.getMovieVideo(id).subscribe((result)=>{
      console.log(result,'getMovieVideo#');
      result.results.forEach((element:any) => {
        if(element.type== "Trailer" ){
          this.movieVideoResult = element.key
        }
      });
    })
  }

  getMovieCast(id:any){
    this.service.getMovieCast(id).subscribe((result)=>{
      console.log(result,'movieCast#');
      this.movieCastResult=result.cast;
      
  })
}

}
