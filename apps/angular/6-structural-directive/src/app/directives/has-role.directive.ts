import { DestroyRef, Directive, inject, input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { UserStore } from "../user.store";
import { Role } from "../user.model";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Subscription } from "rxjs";



export @Directive({
    selector:"[hasRole]",
})
class HasRoleDirective implements OnInit,OnDestroy{
    
   

    private store = inject(UserStore);
    private templateRef = inject(TemplateRef);
    private viewContainerRef = inject(ViewContainerRef);
    hasRole = input.required<Role|Role[]>();
    private subscription:Subscription =  new Subscription();


    ngOnInit() {

        this.subscription = this.store.user$.subscribe({
            next:(user)=>{
                this.viewContainerRef.clear();
                const required = this.hasRole();
                const roles = Array.isArray(required) ? required : [required];
                const allowed = user?.isAdmin || roles.some((r) => user?.roles.includes(r));
                if(allowed){
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                }
            }
        })
        
    }


    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }



}