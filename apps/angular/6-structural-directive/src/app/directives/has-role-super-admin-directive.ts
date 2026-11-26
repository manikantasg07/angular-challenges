import { Directive, inject, input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { UserStore } from "../user.store";
import { Subscription } from "rxjs";


export @Directive({
    selector:"[hasRoleSuperAdmin]"
})
class HasSuperAdminRoleDirective implements OnInit,OnDestroy{

    private templateRef = inject(TemplateRef);
    private viewContainerRef = inject(ViewContainerRef);
    hasRoleSuperAdmin = input.required<boolean>();
    private store = inject(UserStore);
    private subscription:Subscription =  new Subscription();


    

    ngOnInit(): void {
         this.subscription = this.store.user$.subscribe({
            next:(user)=>{
                this.viewContainerRef.clear();
                const allowed = user?.isAdmin && this.hasRoleSuperAdmin();
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