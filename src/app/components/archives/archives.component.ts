import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArchiveService } from '../../services/archive/archive.service';
//import { Subscription } from 'rxjs/Subscription';
 import { Archive } from '../../models/archive';
import { NavigableArchive } from '../../models/navigablearchive';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {

  paginationSize : number = 10;
  ownedArchivesSub : Subscription = this.archiveService.getOwnedArchives(0,this.paginationSize)
  .subscribe( (archive) => {
    this.ownedArchives = archive;
  });
  purchasedArchivesSub : Subscription = this.archiveService.getPurchasedArchives(0,this.paginationSize)
  .subscribe( (archive) => {
    this.purchasedArchives = archive;
  });
   deleteSub : Subscription;
   downloadSub : Subscription;
  ownedArchives : NavigableArchive = new NavigableArchive([],null);
  purchasedArchives : NavigableArchive = new NavigableArchive([],null);
  
   changeDetectorRefs :ChangeDetectorRef[] = [];
  
  constructor(private archiveService: ArchiveService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if(this.ownedArchivesSub){
      this.ownedArchivesSub.unsubscribe();
      }
    if(this.purchasedArchivesSub){
      this.purchasedArchivesSub.unsubscribe();
    }
    if(this.downloadSub !== null && this.downloadSub !== undefined){
      this.downloadSub.unsubscribe();
    }
  }

  getOwnedNext(){
    this.ownedArchivesSub = this.archiveService.navigateNext(this.ownedArchives)
                              .subscribe( (archive) => {
                                                //console.dir(navarchive);
                                                this.ownedArchives=archive;
                              } );
  }

  getOwnedPrevious(){
    this.ownedArchivesSub = this.archiveService.navigateBack(this.ownedArchives)
                              .subscribe( (archive) => {
                                                //console.dir(navarchive);
                                                this.ownedArchives=archive;
                              } );
  }

  getPurNext(){
    this.ownedArchivesSub = this.archiveService.navigateNext(this.purchasedArchives)
                              .subscribe( (archive) => {
                                                //console.dir(navarchive);
                                                this.purchasedArchives=archive;
                              } );
  }

  getPurPrevious(){
    this.ownedArchivesSub = this.archiveService.navigateBack(this.purchasedArchives)
                              .subscribe( (archive) => {
                                                //console.dir(navarchive);
                                                this.purchasedArchives=archive;
                              } );
  }

  download(filename:string){
    this.archiveService.getArchive(filename);
  }

  remove(filename:string){
    let removedElement : Archive;
    //rimozione preventiva dell'elemento dalla lista
    for(let i = 0; i < this.ownedArchives.archives.length; i++){
      let archiveFilename : String = this.ownedArchives.archives[i].filename;
      if(archiveFilename.localeCompare(filename) == 0){
        removedElement = this.ownedArchives.archives[i];
        this.ownedArchives.archives.splice(i, 1);
        break;
      }
    }
    this.deleteSub = this.archiveService.deleteArchive(filename)
                        .subscribe( (data) => {
                          this.ownedArchivesSub = this.archiveService.getOwnedArchives(0,this.paginationSize)
                              .subscribe( (navarchive) => {
                                                //console.dir(navarchive);
                                                this.ownedArchives=navarchive;
                                                this.changeDetectorRef.detectChanges();
                              } );
                        },
                       (error) => {
                         //se ho avuto errore riaggiungo l'elemento nella lista
                         this.ownedArchives.archives.push(removedElement);
                         alert("Server error. Impossibile cancellare " + filename)
                       })

  }
}
