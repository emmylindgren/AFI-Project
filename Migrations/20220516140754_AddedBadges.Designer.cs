﻿// <auto-generated />
using System;
using AFI_Project.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AFI_Project.Migrations
{
    [DbContext(typeof(Database))]
    [Migration("20220516140754_AddedBadges")]
    partial class AddedBadges
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("AFI_Project.Models.AttendingModel", b =>
                {
                    b.Property<int>("Ev_Id")
                        .HasColumnType("int");

                    b.Property<int>("Pr_Id")
                        .HasColumnType("int");

                    b.HasKey("Ev_Id", "Pr_Id");

                    b.HasIndex("Pr_Id");

                    b.ToTable("Tbl_Attendees");
                });

            modelBuilder.Entity("AFI_Project.Models.BadgeModel", b =>
                {
                    b.Property<int>("Ba_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("Ba_DateRecieved")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Ba_Img")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Ba_Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Ba_Id");

                    b.ToTable("Tbl_Badges");
                });

            modelBuilder.Entity("AFI_Project.Models.CategoryModel", b =>
                {
                    b.Property<int>("Cat_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Cat_Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Cat_Id");

                    b.ToTable("Tbl_Categories");
                });

            modelBuilder.Entity("AFI_Project.Models.CommentLikeModel", b =>
                {
                    b.Property<int>("Co_Id")
                        .HasColumnType("int");

                    b.Property<int>("Pr_Id")
                        .HasColumnType("int");

                    b.HasKey("Co_Id", "Pr_Id");

                    b.HasIndex("Pr_Id");

                    b.ToTable("Tbl_CommentLikes");
                });

            modelBuilder.Entity("AFI_Project.Models.CommentModel", b =>
                {
                    b.Property<int>("Co_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Co_Content")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Co_OwnerPr_Id")
                        .HasColumnType("int");

                    b.Property<int>("Co_PostPo_Id")
                        .HasColumnType("int");

                    b.HasKey("Co_Id");

                    b.HasIndex("Co_OwnerPr_Id");

                    b.HasIndex("Co_PostPo_Id");

                    b.ToTable("Tbl_Comments");
                });

            modelBuilder.Entity("AFI_Project.Models.DeclinedInviteModel", b =>
                {
                    b.Property<int>("Ev_Id")
                        .HasColumnType("int");

                    b.Property<int>("Pr_Id")
                        .HasColumnType("int");

                    b.HasKey("Ev_Id", "Pr_Id");

                    b.HasIndex("Pr_Id");

                    b.ToTable("Tbl_DeclinedInvites");
                });

            modelBuilder.Entity("AFI_Project.Models.DisabilityModel", b =>
                {
                    b.Property<int>("Di_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Di_Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Di_Id");

                    b.ToTable("Tbl_Disabilities");
                });

            modelBuilder.Entity("AFI_Project.Models.EventCategoryModel", b =>
                {
                    b.Property<int>("Ev_Id")
                        .HasColumnType("int");

                    b.Property<int>("Cat_Id")
                        .HasColumnType("int");

                    b.HasKey("Ev_Id", "Cat_Id");

                    b.HasIndex("Cat_Id");

                    b.ToTable("Tbl_EventCategories");
                });

            modelBuilder.Entity("AFI_Project.Models.EventDisabilityModel", b =>
                {
                    b.Property<int>("Ev_Id")
                        .HasColumnType("int");

                    b.Property<int>("Dis_Id")
                        .HasColumnType("int");

                    b.HasKey("Ev_Id", "Dis_Id");

                    b.HasIndex("Dis_Id");

                    b.ToTable("Tbl_EventDisabilities");
                });

            modelBuilder.Entity("AFI_Project.Models.EventModel", b =>
                {
                    b.Property<int>("Ev_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Ev_City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Ev_DateTime")
                        .HasColumnType("DateTime")
                        .HasColumnName("Ev_DateTime");

                    b.Property<string>("Ev_Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Ev_Img")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Ev_OwnerPr_Id")
                        .HasColumnType("int");

                    b.Property<string>("Ev_PostalCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Ev_Private")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Ev_Street")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Ev_Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Ev_Id");

                    b.HasIndex("Ev_OwnerPr_Id");

                    b.ToTable("Tbl_Events");
                });

            modelBuilder.Entity("AFI_Project.Models.InterestedModel", b =>
                {
                    b.Property<int>("Ev_Id")
                        .HasColumnType("int");

                    b.Property<int>("Pr_Id")
                        .HasColumnType("int");

                    b.HasKey("Ev_Id", "Pr_Id");

                    b.HasIndex("Pr_Id");

                    b.ToTable("Tbl_Interested");
                });

            modelBuilder.Entity("AFI_Project.Models.PostLikeModel", b =>
                {
                    b.Property<int>("Po_Id")
                        .HasColumnType("int");

                    b.Property<int>("Pr_Id")
                        .HasColumnType("int");

                    b.HasKey("Po_Id", "Pr_Id");

                    b.HasIndex("Pr_Id");

                    b.ToTable("Tbl_PostLikes");
                });

            modelBuilder.Entity("AFI_Project.Models.PostModel", b =>
                {
                    b.Property<int>("Po_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Po_Content")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Po_OwnerPr_Id")
                        .HasColumnType("int");

                    b.HasKey("Po_Id");

                    b.HasIndex("Po_OwnerPr_Id");

                    b.ToTable("Tbl_Posts");
                });

            modelBuilder.Entity("AFI_Project.Models.ProfileBadgesModel", b =>
                {
                    b.Property<int>("Ba_Id")
                        .HasColumnType("int");

                    b.Property<int>("Pr_Id")
                        .HasColumnType("int");

                    b.HasKey("Ba_Id", "Pr_Id");

                    b.HasIndex("Pr_Id");

                    b.ToTable("Tbl_ProfileBadges");
                });

            modelBuilder.Entity("AFI_Project.Models.ProfileDisabilityModel", b =>
                {
                    b.Property<int>("Dis_Id")
                        .HasColumnType("int");

                    b.Property<int>("Pr_Id")
                        .HasColumnType("int");

                    b.HasKey("Dis_Id", "Pr_Id");

                    b.HasIndex("Pr_Id");

                    b.ToTable("Tbl_ProfileDisabilities");
                });

            modelBuilder.Entity("AFI_Project.Models.ProfileModel", b =>
                {
                    b.Property<int>("Pr_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ApiKey")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("GoogleId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Pr_BirthDate")
                        .HasColumnType("Date");

                    b.Property<string>("Pr_City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Pr_Firstname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Pr_GoogleIdSalt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Pr_Img")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Pr_Lastname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Pr_PostalCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Pr_Street")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Pr_Id");

                    b.ToTable("Tbl_Profiles");
                });

            modelBuilder.Entity("AFI_Project.Models.RequestedInviteModel", b =>
                {
                    b.Property<int>("Ev_Id")
                        .HasColumnType("int");

                    b.Property<int>("Pr_Id")
                        .HasColumnType("int");

                    b.HasKey("Ev_Id", "Pr_Id");

                    b.HasIndex("Pr_Id");

                    b.ToTable("Tbl_RequestedInvites");
                });

            modelBuilder.Entity("AFI_Project.Models.AttendingModel", b =>
                {
                    b.HasOne("AFI_Project.Models.EventModel", "At_Event")
                        .WithMany("Ev_AttendingModel")
                        .HasForeignKey("Ev_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AFI_Project.Models.ProfileModel", "At_Profile")
                        .WithMany("Pr_AttendingModel")
                        .HasForeignKey("Pr_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("At_Event");

                    b.Navigation("At_Profile");
                });

            modelBuilder.Entity("AFI_Project.Models.CommentLikeModel", b =>
                {
                    b.HasOne("AFI_Project.Models.CommentModel", "CoLi_Comment")
                        .WithMany("Co_Likes")
                        .HasForeignKey("Co_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AFI_Project.Models.ProfileModel", "CoLi_Profile")
                        .WithMany("Pr_CommentLikes")
                        .HasForeignKey("Pr_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CoLi_Comment");

                    b.Navigation("CoLi_Profile");
                });

            modelBuilder.Entity("AFI_Project.Models.CommentModel", b =>
                {
                    b.HasOne("AFI_Project.Models.ProfileModel", "Co_Owner")
                        .WithMany()
                        .HasForeignKey("Co_OwnerPr_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AFI_Project.Models.PostModel", "Co_Post")
                        .WithMany("Po_Comments")
                        .HasForeignKey("Co_PostPo_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Co_Owner");

                    b.Navigation("Co_Post");
                });

            modelBuilder.Entity("AFI_Project.Models.DeclinedInviteModel", b =>
                {
                    b.HasOne("AFI_Project.Models.EventModel", "Dec_Event")
                        .WithMany("Ev_DeclinedInviteModel")
                        .HasForeignKey("Ev_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AFI_Project.Models.ProfileModel", "Dec_Profile")
                        .WithMany("Pr_DeclinedInviteModel")
                        .HasForeignKey("Pr_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dec_Event");

                    b.Navigation("Dec_Profile");
                });

            modelBuilder.Entity("AFI_Project.Models.EventCategoryModel", b =>
                {
                    b.HasOne("AFI_Project.Models.CategoryModel", "Ev_Cat_Category")
                        .WithMany("Cat_Events")
                        .HasForeignKey("Cat_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AFI_Project.Models.EventModel", "Ev_Cat_Event")
                        .WithMany("Ev_Categories")
                        .HasForeignKey("Ev_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ev_Cat_Category");

                    b.Navigation("Ev_Cat_Event");
                });

            modelBuilder.Entity("AFI_Project.Models.EventDisabilityModel", b =>
                {
                    b.HasOne("AFI_Project.Models.DisabilityModel", "Ev_Dis_Disability")
                        .WithMany("Di_Events")
                        .HasForeignKey("Dis_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AFI_Project.Models.EventModel", "Ev_Dis_Event")
                        .WithMany("Ev_Disabilities")
                        .HasForeignKey("Ev_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ev_Dis_Disability");

                    b.Navigation("Ev_Dis_Event");
                });

            modelBuilder.Entity("AFI_Project.Models.EventModel", b =>
                {
                    b.HasOne("AFI_Project.Models.ProfileModel", "Ev_Owner")
                        .WithMany()
                        .HasForeignKey("Ev_OwnerPr_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ev_Owner");
                });

            modelBuilder.Entity("AFI_Project.Models.InterestedModel", b =>
                {
                    b.HasOne("AFI_Project.Models.EventModel", "In_Event")
                        .WithMany("Ev_InterestedModel")
                        .HasForeignKey("Ev_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AFI_Project.Models.ProfileModel", "In_Profile")
                        .WithMany("Pr_InterestedModel")
                        .HasForeignKey("Pr_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("In_Event");

                    b.Navigation("In_Profile");
                });

            modelBuilder.Entity("AFI_Project.Models.PostLikeModel", b =>
                {
                    b.HasOne("AFI_Project.Models.PostModel", "PoLi_Post")
                        .WithMany("Po_Likes")
                        .HasForeignKey("Po_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AFI_Project.Models.ProfileModel", "PoLi_Profile")
                        .WithMany("Pr_PostLikes")
                        .HasForeignKey("Pr_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PoLi_Post");

                    b.Navigation("PoLi_Profile");
                });

            modelBuilder.Entity("AFI_Project.Models.PostModel", b =>
                {
                    b.HasOne("AFI_Project.Models.ProfileModel", "Po_Owner")
                        .WithMany()
                        .HasForeignKey("Po_OwnerPr_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Po_Owner");
                });

            modelBuilder.Entity("AFI_Project.Models.ProfileBadgesModel", b =>
                {
                    b.HasOne("AFI_Project.Models.BadgeModel", "Pr_Ba_Badge")
                        .WithMany("Ba_Profiles")
                        .HasForeignKey("Ba_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AFI_Project.Models.ProfileModel", "Pr_Ba_Profile")
                        .WithMany("Pr_Badges")
                        .HasForeignKey("Pr_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pr_Ba_Badge");

                    b.Navigation("Pr_Ba_Profile");
                });

            modelBuilder.Entity("AFI_Project.Models.ProfileDisabilityModel", b =>
                {
                    b.HasOne("AFI_Project.Models.DisabilityModel", "Pr_Dis_Disability")
                        .WithMany("Di_Profiles")
                        .HasForeignKey("Dis_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AFI_Project.Models.ProfileModel", "Pr_Dis_Profile")
                        .WithMany("Pr_Disabilities")
                        .HasForeignKey("Pr_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pr_Dis_Disability");

                    b.Navigation("Pr_Dis_Profile");
                });

            modelBuilder.Entity("AFI_Project.Models.RequestedInviteModel", b =>
                {
                    b.HasOne("AFI_Project.Models.EventModel", "Req_Event")
                        .WithMany("Ev_RequestedInviteModel")
                        .HasForeignKey("Ev_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AFI_Project.Models.ProfileModel", "Req_Profile")
                        .WithMany("Pr_RequestedInviteModel")
                        .HasForeignKey("Pr_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Req_Event");

                    b.Navigation("Req_Profile");
                });

            modelBuilder.Entity("AFI_Project.Models.BadgeModel", b =>
                {
                    b.Navigation("Ba_Profiles");
                });

            modelBuilder.Entity("AFI_Project.Models.CategoryModel", b =>
                {
                    b.Navigation("Cat_Events");
                });

            modelBuilder.Entity("AFI_Project.Models.CommentModel", b =>
                {
                    b.Navigation("Co_Likes");
                });

            modelBuilder.Entity("AFI_Project.Models.DisabilityModel", b =>
                {
                    b.Navigation("Di_Events");

                    b.Navigation("Di_Profiles");
                });

            modelBuilder.Entity("AFI_Project.Models.EventModel", b =>
                {
                    b.Navigation("Ev_AttendingModel");

                    b.Navigation("Ev_Categories");

                    b.Navigation("Ev_DeclinedInviteModel");

                    b.Navigation("Ev_Disabilities");

                    b.Navigation("Ev_InterestedModel");

                    b.Navigation("Ev_RequestedInviteModel");
                });

            modelBuilder.Entity("AFI_Project.Models.PostModel", b =>
                {
                    b.Navigation("Po_Comments");

                    b.Navigation("Po_Likes");
                });

            modelBuilder.Entity("AFI_Project.Models.ProfileModel", b =>
                {
                    b.Navigation("Pr_AttendingModel");

                    b.Navigation("Pr_Badges");

                    b.Navigation("Pr_CommentLikes");

                    b.Navigation("Pr_DeclinedInviteModel");

                    b.Navigation("Pr_Disabilities");

                    b.Navigation("Pr_InterestedModel");

                    b.Navigation("Pr_PostLikes");

                    b.Navigation("Pr_RequestedInviteModel");
                });
#pragma warning restore 612, 618
        }
    }
}
